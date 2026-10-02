export const colors = {
  primary: "#3057B9",
  success: "#008000",
  error: "#FF0000",
  dark: "#232323",
  white: "#FFFFFF",
};

export const spacing = {
  small: "8px",
  medium: "16px",
  large: "32px",
};

export const borderRadius = {
  small: "4px",
  medium: "8px",
  large: "12px",
};

export const getStatusColor = ({
  isError,
  isSuccess,
}) => {
  if (isError) {
    return colors.error;
  }

  if (isSuccess) {
    return colors.success;
  }

  return colors.dark;
};