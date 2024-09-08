interface IOptions {
  reversed: boolean;
}

export const formatDate = (str: Date, options?: IOptions) => {
  try {
    const { reversed } = options || {};
    const date = new Date(str);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const adjustedDay = day < 10 ? `0${day}` : day;
    const adjustedMonth = month < 10 ? `0${month}` : month;
    const adjustedYear = year < 10 ? `0${year}` : year;

    if (reversed) return `${adjustedYear}-${adjustedMonth}-${adjustedDay}`;

    return `${adjustedDay}-${adjustedMonth}-${adjustedYear}`;
  } catch (err) {
    return str;
  }
};
