import { RegisterOptions } from 'react-hook-form';

export const emailRules: RegisterOptions = {
  required: {
    value: true,
    message: 'Campo requerido'
  },
  validate: (value: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
      return 'Correo electrónico no válido.';
    }

    return true;
  }
};

/**
 * Function to validate full password requirements.
 */
export const passwordRule: RegisterOptions = {
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (!(value.length < 8) && value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/\d/) && value.match(/\W/) && !value.match(/\s/)) {
      return true;
    }
    return 'Ingresa una contraseña válida.';
  }
};

/**
 * Function to validate a minimum password requirement on manual login.
 */
export const passwordMinimumRule: RegisterOptions = {
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (value.length < 8 || value.match(/\s/)) {
      return 'Ingresa una contraseña válida.';
    }
    return true;
  }
};

export const confirmPasswordRule = (compare: string): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z.\d]{6,}$/.test(value)) {
      return 'Ingresa una contraseña válida.';
    }

    if (value !== compare) {
      return 'La contraseña no coincide.';
    }

    return true;
  }
});

export const confirmOtpRule = (compare: string): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (value !== compare) {
      return 'Los códigos no coinciden.';
    }

    return true;
  }
});

export const otpRule: RegisterOptions = {
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  maxLength: 6
};

export const alphabetRule = (required: boolean): RegisterOptions => ({
  required: {
    value: required,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (!/^[A-Za-zñÑáÁéÉíÍóÓúÚöÖüÜ ]+$/.test(value)) {
      return 'Ingresa un formato válido.';
    }

    return true;
  }
});

export const mobilePhoneRule = (required: boolean): RegisterOptions => ({
  required: {
    value: required,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (!/^[0-9]{10}$/.test(value)) {
      return 'Formato incorrecto.';
    }

    return true;
  }
});

export const trackingNumberRule = (required: boolean): RegisterOptions => ({
  required: {
    value: required,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (!/^[0-9]{22}$/.test(value)) {
      return 'Formato incorrecto.';
    }

    return true;
  }
});

export const rfcRule: RegisterOptions = {
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  validate: (value: string) => {
    if (!/^([A-ZÑ&]{3,4})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([A-Z\d]{2})([A\d])$/.test(value)) {
      return 'Formato incorrecto.';
    }

    return true;
  },
  minLength: 1
};

/**
 * Function to validate a minimum length for numeric fields.
 */
export const numericWithSpecificLenght = (lenght: number): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  },
  validate: (value: string) => {
    if (!value.match(/\d/)) return false;
    return true;
  }
});

/**
 * Function to validate a minimum length for numeric fields.
 */
export const onlyNumericWithSpecificLenght = (lenght: number): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  },
  pattern: {
    value: /^[0-9]*$/,
    message: 'Caracter no válido.'
  },
  validate: (value: string) => {
    if (!value.match(/^[0-9]*$/)) return false;
    return true;
  }
});

/**
 * Function to validate date fields (dd/mm/yyyy).
 */
export const date: RegisterOptions = {
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  minLength: {
    value: 10,
    message: 'Longitud inválida.'
  },
  validate: (value: string) => {
    if (
      !value.match(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      )
    ) {
      return false;
    }
    return true;
  }
};

/**
 * Function to validate AlphaNumeric Fields with minimum lenght.
 */
export const alphaNumeric = (lenght: number): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  },
  validate: (value: string) => {
    if (!value.match(/[A-Za-z0-9]/) || value.match(/\s/)) {
      return 'Formato inválido.';
    }
    return true;
  }
});

/**
 * Function to validate an open field with minimum lenght and no white spaces.
 */
export const openField = (lenght: number): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  }
});

/**
 * Function to validate an open field with minimum lenght and no white spaces.
 */
export const openFieldNotRequire = (lenght: number): RegisterOptions => ({
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  }
});

/**
 * Function to validate a field with emails list.
 */
export const emailsList = (lenght: number): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  },
  validate: (value: string) => {
    if (!value.match(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/)) {
      return false;
    }
    return true;
  }
});

export const alphaNumericWithoutSpaces = (lenght: number, min?: number): RegisterOptions => ({
  required: {
    value: true,
    message: 'Campo requerido.'
  },
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  },
  pattern: {
    value: /^[a-zA-Z0-9-ZÀ-ÿ\u00f1\u00d1]*$/,
    message: 'Caracter no válido.'
  },
  maxLength: {
    value: min ? min : 100,
    message: 'Longitud inválida.'
  }
});

export const NRalphaNumericWithSpacesAndDot = (lenght: number): RegisterOptions => ({
  minLength: {
    value: lenght,
    message: 'Longitud inválida.'
  },
  pattern: {
    value: /^[a-zA-Z0-9-ZÀ-ÿ\u00f1\u00d1#]+(\s*[a-zA-Z0-9-ZÀ-ÿ\u00f1\u00d1#]+)*[a-zA-Z0-9-ZÀ-ÿ\u00f1\u00d1# .\s-]+$/,
    message: 'Caracter no válido.'
  }
});
