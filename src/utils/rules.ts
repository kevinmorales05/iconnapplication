
import { RegisterOptions } from 'react-hook-form';

export const emailRules: RegisterOptions = {
  required: {
    value: true,
    message: `Campo requerido`
  },
  validate: (value: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
      return `Ingresa un email valido`;
    }

    return true;
  }
};

export const passwordRule: RegisterOptions = {
  required: {
    value: true,
    message: `Campo requerido`
  },
  validate: (value: string) => {
    if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z.\d]{6,}$/.test(value)) {
      return `Ingresa una contraseña valida`;
    }

    return true;
  }
};

export const confirmPasswordRule = (compare: string): RegisterOptions => ({
  required: {
    value: true,
    message: `Campo requerido`
  },
  validate: (value: string) => {
    if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z.\d]{6,}$/.test(value)) {
      return `Ingresa una contraseña valida`;
    }

    if (value !== compare) {
      return `La contraseña no coincide`;
    }

    return true;
  }
});

export const confirmOtpRule = (compare: string): RegisterOptions => ({
  required: {
    value: true,
    message: `Campo requerido`
  },
  validate: (value: string) => {
    if (value !== compare) {
      return 'Los códigos no coinciden';
    }

    return true;
  }
});

export const otpRule: RegisterOptions = {
  required: {
    value: true,
    message: `Campo requerido`
  },
  maxLength: 6
};

export const alphabetRule = (required: boolean): RegisterOptions => ({
  required: {
    value: required,
    message: `Campo requerido`
  },
  validate: (value: string) => {
    if (!/^[A-Za-zñÑáÁéÉíÍóÓúÚöÖüÜ ]+$/.test(value)) {
      return `Ingresa un formato valido`;
    }

    return true;
  }
});

export const mobilePhoneRule: RegisterOptions = {
  required: {
    value: true,
    message: `Campo requerido`
  },
  validate: (value: string) => {
    if (!/^[0-9]{10}$/.test(value)) {
      return 'Formato incorrecto';
    }

    return true;
  },
  minLength: 1
};
