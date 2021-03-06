import React from 'react';

export default function childrenHavePropXorChildren(prop) {
  if (typeof prop !== 'string' && typeof prop !== 'symbol') {
    throw new TypeError('invalid prop: must be string or symbol');
  }

  const validator = function childrenHavePropXorChildrenWithProp({ children }, _, componentName) {
    const childrenCount = React.Children.count(children);
    let propCount = 0;
    let grandchildrenCount = 0;

    React.Children.forEach(children, (child) => {
      if (child.props[prop]) {
        propCount += 1;
      }
      if (React.Children.count(child.props.children)) {
        grandchildrenCount += 1;
      }
    });

    if (
      (propCount === childrenCount && grandchildrenCount === 0) ||
      (propCount === 0 && grandchildrenCount === childrenCount) ||
      (propCount === 0 && grandchildrenCount === 0)
    ) {
      return null;
    }

    return new TypeError(`\`${componentName}\` requires children to all have prop “${prop}”, all have children, or all have neither.`);
  };
  validator.typeName = `childrenHavePropXorChildrenWithProp:${prop}`;
  return validator;
}
