export const proccessFetchError = (err, defaultMsg) => {
  if (err.response) {
    const errors = Object.keys(err.response?.data?.errors);

    if (errors.includes("phone")) return "خطأ: رقم الهاتف مستخدم بالفعل";
    else if (errors.includes("email"))
      return "خطأ: البريد الاليكتروني مستخدم بالفعل";
  }

  switch (err.message) {
    case "Network Error":
      return "خطأ في الشبكة: تأكد انك متصل بالانترنت ثم اعد المحاولة";
    default:
      return defaultMsg;
  }
};
