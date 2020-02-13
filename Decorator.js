import Compiler from './Compiler';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default function(config) {
  let compiler;
  const decorator = function(WrappedComponent) {
    return function(props) {
      const isStateless =
        !WrappedComponent.prototype ||
        (!WrappedComponent.isReactComponent &&
          !WrappedComponent.prototype.render &&
          !WrappedComponent.prototype.componentDidMount);

      if (isStateless) {
        return compiler.traverse(WrappedComponent(props));
      } else {
        class Wrapper extends WrappedComponent {
          static initClass() {
            this.displayName = `ClassNames(${getDisplayName(
              WrappedComponent
            )})`;
          }

          render() {
            if (WrappedComponent.prototype.render) {
              return compiler.traverse(super.render());
            } else {
              return compiler.traverse(
                WrappedComponent(this.props, this.props.children)
              );
            }
          }
        }

        Wrapper.initClass();

        return Wrapper;
      }
    };
  };

  if (typeof config === 'function') {
    compiler = new Compiler();
    return decorator(config);
  } else {
    compiler = new Compiler(config);
    return decorator;
  }
}
