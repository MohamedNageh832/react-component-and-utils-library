function calculateAge(birthDateInput: string) {
  // Parse the birth date
  const birthDate = new Date(birthDateInput);
  const today = new Date();

  // Calculate the difference in years, months, and days
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust years and months if necessary
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12; // Adding 12 months because we moved to the previous year
  }

  // Adjust days
  if (days < 0) {
    // Get the previous month (could be the current month in the birth year)
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate(); // Number of days in the previous month
    months--;
  }

  // If months were adjusted and became negative, adjust years and months again
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export { calculateAge };
