import * as _ from 'lodash';

export function getParam<K = string>(
  obj: { props: any },
  name: string,
  defaultValue: any = null,
): K {
  return _.get(obj.props, ['match', 'params', name], defaultValue);
}
