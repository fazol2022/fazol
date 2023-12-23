import React from 'react';
import Input from 'minimal-components-react/dist/components/Input';
import Action from 'minimal-components-react/dist/components/List/Action';
import Collapsible from 'minimal-components-react/dist/components/Collapsible';
import OpenButton from 'minimal-components-react/dist/components/Collapsible/openButton';
import { Span, Text } from 'minimal-components-react/dist/components/Text';
import { colors, priorityColor, stringToRgb } from '../color';
import { Left, Right } from 'minimal-components-react/dist/components/Content';
import { MilkBar, PacMan } from '../icons';

export const handleDelete = (elements, setElements, id) => () => {
  setElements(elements?.filter((element) => element?.id !== id));
};

export const stylesLeading = (theme, lightTheme) => ({
  add: {
    padding: '17px',
    margin: '0px',
    fontSize: '30px',
    height: '100%',
    width: '100%',
  },
  edit: {
    padding: '0px',
    margin: '15px',
    height: '40px',
    width: '40px',
    background:
      'url(' +
      (theme === lightTheme ? '/img/edit.svg' : '/img/editInvert.svg') +
      ') no-repeat center ',
  },
});

export const stylesTrailing = (_theme, _lightTheme) => ({
  clear: {
    padding: '17px',
    margin: '0px',
    fontSize: '30px',
    height: '100%',
    width: '100%',
  },
  delete: {
    padding: '17px',
    margin: '0px',
    fontSize: '30px',
    height: '100%',
    width: '100%',
  },
});

export const addAction = (onClick?, addTitle?: string, theme?, lightTheme?) => (
  <Action onClick={onClick} style={{ backgroundColor: colors.accepted }}>
    <Input
      title={addTitle}
      type={'button'}
      crude
      value={'+'}
      style={stylesLeading?.(theme, lightTheme)?.add}
      noBackground
      inverted
    ></Input>
  </Action>
);

export const editAction = (
  onClick?,
  editTitle?: string,
  theme?,
  lightTheme?
) => (
  <Action style={{ backgroundColor: colors.rejected }} onClick={onClick}>
    <Input
      title={editTitle}
      type={'button'}
      crude
      style={stylesLeading?.(theme, lightTheme)?.edit}
      inverted
    ></Input>
  </Action>
);

export const deleteAction = (
  onClick?,
  deleteTitle?: string,
  theme?,
  lightTheme?
) => (
  <Action
    destructive
    onClick={onClick}
    style={{ backgroundColor: colors.deleted }}
  >
    <Input
      title={deleteTitle}
      type={'button'}
      crude
      value={'-'}
      style={stylesTrailing?.(theme, lightTheme)?.delete}
      inverted
      noBackground
    ></Input>
  </Action>
);

export const clearAction = (
  onClick?,
  clearTitle?: string,
  theme?,
  lightTheme?
) => (
  <Action onClick={onClick} style={{ backgroundColor: colors.rejected }}>
    <Input
      title={clearTitle}
      type={'button'}
      crude
      value={'∅'}
      style={stylesTrailing?.(theme, lightTheme)?.clear}
      inverted
      noBackground
    ></Input>
  </Action>
);

export const basicLeading = (
  onClicks?: { add?: () => unknown; edit?: () => unknown },
  titles?: { add?: string; edit?: string },
  theme?,
  lightTheme?
) => <>{editAction(onClicks?.edit, titles?.edit, theme, lightTheme)}</>;

export const basicTrailing = (
  onClicks?: { clear?: () => unknown; delete?: () => unknown },
  titles?: { clear?: string; delete?: string }
) => <>{deleteAction(onClicks?.delete, titles?.delete)}</>;

export const fullLeading = (
  onClicks?: { add?: () => unknown; edit?: () => unknown },
  titles?: { add?: string; edit?: string },
  theme?,
  lightTheme?
) => (
  <>
    {addAction(onClicks?.add, titles?.add, theme, lightTheme)}
    {editAction(onClicks?.edit, titles?.edit, theme, lightTheme)}
  </>
);

export const fullTrailing = (
  onClicks?: { clear?: () => unknown; delete?: () => unknown },
  titles?: { clear?: string; delete?: string }
) => (
  <>
    {clearAction(onClicks?.clear, titles?.clear)}
    {deleteAction(onClicks?.delete, titles?.delete)}
  </>
);

export const leading = (
  type: 'place' | 'storage' | 'product',
  onClicks?: { add?: () => unknown; edit?: () => unknown },
  titles?: { add?: string; edit?: string },
  theme?,
  lightTheme?
) => {
  switch (type) {
    default:
      return basicLeading(onClicks, titles, theme, lightTheme);
    case 'product':
      return fullLeading(onClicks, titles, theme, lightTheme);
  }
};

export const trailing = (
  type: 'place' | 'storage' | 'product',
  onClicks?: { clear?: () => unknown; delete?: () => unknown },
  titles?: { clear?: string; delete?: string },
  _theme?,
  _lightTheme?
) => {
  switch (type) {
    default:
      return basicTrailing(onClicks, titles);
    case 'product':
      return fullTrailing(onClicks, titles);
  }
};

const addProduct = (
  element,
  index,
  _setSearch,
  _navigate,
  _location,
  refresh,
  _elements,
  _setElements
) => {
  console.log('Add Product', index, element);
  // serving(element?.id);
  refresh?.();
};

const onAdd = (
  type: 'place' | 'storage' | 'product',
  element,
  index,
  setSearch,
  navigate,
  location,
  refresh,
  elements,
  setElements
) => {
  switch (type) {
    case 'product':
      return addProduct(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      );
    default:
      break;
  }
};

const editProduct = (
  element,
  index,
  setSearch,
  navigate,
  location,
  _refresh,
  _elements,
  _setElements
) => {
  console.log('Edit Product', index);
  setSearch?.('');
  navigate?.({
    pathname: `${location.pathname}/product`,
    search: `?id=${element.id}`,
  });
  console.log('Product actionLeading0', `?id=${element.id}`);
};

const editStorage = (
  element,
  index,
  setSearch,
  navigate,
  location,
  _refresh,
  _elements,
  _setElements
) => {
  console.log('Edit Storage', index);
  setSearch?.('');
  navigate?.({
    pathname: `${location.pathname}/storage`,
    search: `?id=${element.id}`,
  });
  console.log('Storage actionLeading0', `?id=${element.id}`);
};

const editPlace = (
  element,
  index,
  setSearch,
  navigate,
  _location,
  _refresh,
  _elements,
  _setElements
) => {
  console.log('Edit Place', index);
  setSearch?.('');
  navigate?.({ pathname: 'place', search: `?id=${element.id}` });
  console.log('Place actionLeading0', `?id=${element.id}`);
};

const onEdit = (
  type: 'place' | 'storage' | 'product',
  element,
  index,
  setSearch,
  navigate,
  location,
  refresh,
  elements,
  setElements
) => {
  switch (type) {
    case 'product':
      return editProduct(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      );
    case 'storage':
      return editStorage(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      );
    case 'place':
      return editPlace(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      );
  }
};

const clearProduct = (
  element,
  index,
  _setSearch,
  _navigate,
  _location,
  refresh
) => {
  console.log('Clear Product', index, element);
  // serving(element?.id, true, true);
  refresh?.();
};

const onClear = (
  type: 'place' | 'storage' | 'product',
  element,
  index,
  setSearch,
  navigate,
  location,
  refresh,
  _elements,
  _setElements
) => {
  switch (type) {
    case 'product':
      return clearProduct(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh
      );
    default:
      break;
  }
};

const deleteProduct = (
  element,
  index,
  _setSearch,
  _navigate,
  _location,
  _refresh,
  elements,
  setElements
) => {
  console.log('Delete Product', index);
  setElements(elements?.filter((e) => e?.id !== element?.id));
};

const deleteStorage = (
  element,
  index,
  _setSearch,
  _navigate,
  _location,
  _refresh,
  elements,
  setElements
) => {
  console.log('Delete Storage', index);
  setElements(elements?.filter((e) => e?.id !== element?.id));
};

const deletePlace = (
  element,
  index,
  _setSearch,
  _navigate,
  _location,
  _refresh,
  elements,
  setElements
) => {
  console.log('Delete Place', index, elements);
  setElements(elements?.filter((e) => e?.id !== element?.id));
};

const onDelete = (
  type: 'place' | 'storage' | 'product',
  element,
  index,
  setSearch,
  navigate,
  location,
  refresh,
  elements,
  setElements
) => {
  switch (type) {
    case 'product':
      return deleteProduct(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      );
    case 'storage':
      return deleteStorage(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      );
    case 'place':
      return deletePlace(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      );
  }
};

const clickProduct = (
  element,
  index,
  _setSearch,
  _navigate,
  _location,
  refresh
) => {
  console.log('Click Product', index, element);
  // console.log('Consume');
  // serving(element?.id, true);
  refresh?.();
};

const clickStorage = (element, index, setSearch, navigate, location) => {
  console.log('Click Storage', index);
  if (element.id != undefined) {
    setSearch?.('');
    navigate?.({ pathname: `${location?.pathname}/${element.id}` });
    console.log('Storage actionClick', `${location?.pathname}/${element.id}`);
  }
};

const clickPlace = (element, index, setSearch, navigate) => {
  console.log('Click Place', index);
  if (element?.id != undefined) {
    setSearch?.('');
    navigate?.({ pathname: `${element.id}` });
    console.log('Place actionClick', `${element.id}`);
  }
};

const onClick = (
  type: 'place' | 'storage' | 'product',
  element,
  index,
  setSearch,
  navigate,
  location,
  refresh,
  _elements,
  _setElements
) => {
  switch (type) {
    case 'product':
      return clickProduct(
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh
      );
    case 'storage':
      return clickStorage(element, index, setSearch, navigate, location);
    case 'place':
      return clickPlace(element, index, setSearch, navigate);
  }
};

export const onClicks = (
  type: 'place' | 'storage' | 'product',
  element,
  index,
  setSearch,
  navigate,
  location,
  refresh,
  elements,
  setElements
) => {
  const onClicks = {
    add: () =>
      onAdd(
        type,
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      ),
    edit: () =>
      onEdit(
        type,
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      ),
    clear: () =>
      onClear(
        type,
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      ),
    delete: () =>
      onDelete(
        type,
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      ),
    click: () =>
      onClick(
        type,
        element,
        index,
        setSearch,
        navigate,
        location,
        refresh,
        elements,
        setElements
      ),
  };
  return onClicks;
};

const generateGradient = (
  defaultColor: number[]
): { max: number; rgb: number[] }[] => {
  return [
    { max: 0, rgb: [255, 0, 0] }, //red
    { max: 50, rgb: defaultColor },
    { max: 100, rgb: defaultColor },
  ];
};

const daysBetween = (
  manufacturingDate?: Date,
  expirationDate?: Date
): number => {
  const difference =
    (expirationDate?.getTime() || 0) - (manufacturingDate?.getTime() || 0);
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

const daysTo = (expirationDate: Date): number => {
  const difference = expirationDate.getTime() - new Date().getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

const percentage = (current: number, total: number): number => {
  return (current / total) * 100;
};

const percentageString = (current: number, total: number): string => {
  return '' + +parseFloat('' + percentage(current, total)).toFixed(2) + '%';
};

const smartExpirationPercentage = (
  manufacturingDate?: Date,
  expirationDate?: Date
): number => {
  const dT = expirationDate ? daysTo(expirationDate) : 0;
  const dB = manufacturingDate
    ? daysBetween(manufacturingDate, expirationDate)
    : 0;
  const p = percentage(dT, dB);
  const s = dT < 2 ? dT : p;
  return s;
};

const complexItem = (element, _index, theme, _lightTheme) => {
  console.log('Complex Item', element);
  const quantity = element?.quantities?.length || 0;
  const content = element?.quantities?.[0] || 0;
  return (
    <div
      style={{ height: '70px', width: 'calc(100% - 40px)', display: 'flex' }}
    >
      <Left
        style={{
          padding: '12.5px 10px',
          width: '45px',
          minWidth: '45px',
        }}
      >
        <div style={{ height: '45px', width: '25px' }}>
          <MilkBar
            id={element?.id}
            max={(content || 0) / (element?.capacity || 1)}
            fillColor={priorityColor(
              percentage(content || 0, element?.capacity || 1),
              100,
              stringToRgb(theme.primary),
              generateGradient
            )}
            quantity={quantity}
            // styles={{filter='grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%) contrast(1)'}}
          />
        </div>
      </Left>
      <Left
        style={{
          padding: '26.5px 10px',
          width: 'calc(50% - (45px))',
        }}
      >
        <div>
          <Text>{element?.name}</Text>
          <Text>{element?.info}</Text>
        </div>
      </Left>
      <Right
        style={{
          padding: '26.5px 10px',
          width: 'calc(50% - (45px))',
        }}
      >
        <div>
          <Text
            style={{
              color: priorityColor(
                smartExpirationPercentage(
                  element?.manufacturingDate,
                  element?.expirationDate
                ),
                100,
                stringToRgb(theme.primary),
                generateGradient
              ),
            }}
          >
            {element?.expirationDate?.toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            {content + '/' + element?.capacity + ' ' + element?.unit} -{' '}
            {percentageString(content || 0, element?.capacity || 1)}
          </Text>
        </div>
      </Right>
      <Right style={{ padding: '12.5px' }}>
        <div style={{ height: '45px', width: '45px' }}>
          <PacMan id={element?.id} fillColor={theme.primary} />
        </div>
      </Right>
    </div>
  );
};

export const fullItem = (element, _index, theme, lightTheme) => {
  return (
    <Collapsible
      // key={key}
      style={{
        width: '100%',
      }}
      before={
        <OpenButton rotate rotation={90} time={0.5}>
          <div
            style={{
              width: '40px',
              // width: '25px',
              height: '25px',
              marginTop: '25px',
              marginBottom: '25px',
              // marginLeft: '10px',
              // marginRight: '10px',
              background:
                'url(' +
                (theme === lightTheme
                  ? '/img/right.svg'
                  : '/img/rightInvert.svg') +
                ') no-repeat center transparent ',
            }}
          ></div>
        </OpenButton>
      }
      trigger={complexItem(element, _index, theme, lightTheme)}
    >
      <div style={{ width: '100%' }}>INTERNAL</div>
    </Collapsible>
  );
};

export const basicItem = (element, _index, _theme, _lightTheme) => (
  <Text
    style={{
      padding: '26.5px 0',
      textAlign: 'center',
    }}
  >
    {element?.name}
  </Text>
);

export const item = (
  type: 'place' | 'storage' | 'product',
  element,
  index,
  theme,
  lightTheme
) => {
  console.log('item', element);
  switch (type) {
    default:
      return basicItem(element, index, theme, lightTheme);
    case 'product':
      return fullItem(element, index, theme, lightTheme);
  }
};
