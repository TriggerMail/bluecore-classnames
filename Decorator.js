// @flow
import Compiler from './Compiler';

// types
import type {TConfig} from './Compiler';

const getDisplayName = (WrappedComponent: any) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default function(config: TConfig) {
  let compiler;
  const decorator = function(WrappedComponent: any) {
    const isStateless =
      !WrappedComponent.prototype ||
      (!WrappedComponent.isReactComponent &&
        !WrappedComponent.prototype.render &&
        !WrappedComponent.prototype.componentDidMount);

    if (isStateless) {
      return function ClassNamesComponent(props: Object) {
        return compiler.traverse(WrappedComponent(props));
      };
    } else {
      class Wrapper extends WrappedComponent {
        static initClass() {
          this.displayName = `ClassNames(${getDisplayName(WrappedComponent)})`;
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

  if (typeof config === 'function') {
    compiler = new Compiler();
    return decorator(config);
  } else {
    compiler = new Compiler(config);
    return decorator;
  }
}
