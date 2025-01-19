import { IAutoHandlingValidator, IInValidator, IMatchValidator, IPrimitiveValidator, IValidationErrorItem, ValidationItem } from './../types';

export const validator = (name: string, value: any, array: ValidationItem[]) => {
  const target = { name, value }
  const currentInputItems = array.filter((item) => item.fields.indexOf(name) > -1);
  let result = [] as IValidationErrorItem[];
  currentInputItems.forEach((item) => {
    const validatorProps = { item, target, result }

    switch (validatorProps.item.type) {
      case "required":
        requiredCase(validatorProps as IAutoHandlingValidator);
        break;
      case "string":
        stringCase(validatorProps as IPrimitiveValidator);
        break;
      case "integer":
        integerCase(validatorProps as IPrimitiveValidator);
        break;
      case "double":
        doubleCase(validatorProps as IPrimitiveValidator);
        break;
      case "match":
        matchCase(validatorProps as IMatchValidator);
        break;
      case "email":
        emailCase(validatorProps as IAutoHandlingValidator);
        break;
      case "in":
        inCase(validatorProps as IInValidator);
        break;
      case "date":
        break;
      case "time":
        break;
      case "link":
        break;
      default:
        break;
    }
  });
  return result;
};

const requiredCase = ({ item, target, result }: IAutoHandlingValidator) => {
  const invalidLength = target.value?.length === 0;
  let message = "Поле обязательно для заполнения";
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidLength) {
    result.push({
      field: target.name,
      message: message,
    });
  }
};

const stringCase = ({ item, target, result }: IPrimitiveValidator) => {
  let invalidLengthMin = false;
  let invalidLengthMax = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.rules !== undefined) {
    if (item.rules.min !== undefined) {
      invalidLengthMin = target.value.length < item.rules.min;
      message = `Длинна должна быть больше ${item.rules.min} символов`;
    }
    if (item.rules.max !== undefined) {
      invalidLengthMax = target.value.length > item.rules.max;
      message = `Длинна не должна превышать ${item.rules.max} символов`;
    }
    if (item.rules.message !== undefined) {
      message = item.rules.message;
    }
  }
  if (invalidLengthMin || invalidLengthMax) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const integerCase = ({ item, target, result }: IPrimitiveValidator) => {
  let invalidMin = false;
  let invalidMax = false;
  let invalidInteger = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.rules !== undefined) {
    if (item.rules.min !== undefined) {
      invalidMin = target.value < item.rules.min;
      message = `Число должно быть больше чем ${item.rules.min}`;
    }
    if (item.rules.max !== undefined) {
      invalidMax = target.value > item.rules.max;
      message = `Число должно быть меньше чем ${item.rules.max}`;
    }
    if (typeof target.value === 'string' && !target.value.match(/^\d+$/)) {
      invalidInteger = true;
      message = `Требуется целое числовое значение`;
    }
    if (item.rules.message) {
      message = item.rules.message;
    }
  }
  if (invalidMin || invalidMax || invalidInteger) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const doubleCase = ({ item, target, result }: IPrimitiveValidator) => {
  let invalidMin = false;
  let invalidMax = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.rules !== undefined) {
    if (item.rules.min !== undefined) {
      invalidMin = target.value < item.rules.min;
      message = `Число должно быть больше чем ${item.rules.min}`;
    }
    if (item.rules.max !== undefined) {
      invalidMax = target.value > item.rules.max;
      message = `Число должно быть меньше чем ${item.rules.max}`;
    }
    if (item.rules.message !== undefined) {
      message = item.rules.message;
    }
  }
  if (invalidMin || invalidMax) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const matchCase = ({ item, target, result }: IMatchValidator) => {
  let invalidMatch = false;
  let message = "Стандартное сообщение об ошибке";
  if (item.rules !== undefined) {
    if (item.rules.pattern !== undefined) {
      if (!target.value.match(item.rules.pattern)) {
        invalidMatch = true;
      }
    }
    if (item.rules.message !== undefined) {
      message = item.rules.message;
    }
  }
  if (invalidMatch) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const emailCase = ({ item, target, result }: IAutoHandlingValidator) => {
  let invalidEmail = false;
  let message = "Введите корруктный email";
  if (
    target.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    invalidEmail = true;
  }
  if (item.hasOwnProperty("rules")) {
    if (item.rules.hasOwnProperty("message")) {
      message = item.rules.message;
    }
  }
  if (invalidEmail) {
    result.push({
      field: target.name,
      message,
    });
  }
};

const inCase = ({ item, target, result }: IInValidator) => {
  let invalidValueInArray = false;
  let message = "Введите корректный email";
  if (item.rules !== undefined) {
    if (item.rules !== undefined && item.rules.range !== undefined) {
      invalidValueInArray = true;
    }
    if (item.rules.message !== undefined) {
      message = item.rules.message;
    }
  }

  if (invalidValueInArray) {
    result.push({
      field: target.name,
      message,
    });
  }
};
