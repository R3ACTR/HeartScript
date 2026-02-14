export function generateMDate(date1 = "", date2 = "", date3 = "", date4 = "") {
  if (!date1 || !date2 || !date3 || !date4) return null;

  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const d3 = new Date(date3);
  const d4 = new Date(date4);

  //difference in days between date2 and date3
  const diffInDays = Math.ceil(Math.abs(d3 - d2) / (1000 * 60 * 60 * 24));

  //add difference to date1
  let resultDate = new Date(d1);
  resultDate.setDate(resultDate.getDate() + diffInDays);

  //30 days gap from date4
  const differenceFromDate4 = Math.abs((resultDate - d4) / (1000 * 60 * 60 * 24));
  if (differenceFromDate4 <= 30) {
    resultDate.setDate(resultDate.getDate() + 49); // golden ratio days
  }

  // compute year using average age at meeting + golden ratio factor
  const age1 = d3.getFullYear() - d1.getFullYear(); // age of person1
  const age2 = d3.getFullYear() - d2.getFullYear(); // age of person2
  const avgAge = (age1 + age2) / 2;

  const goldenOffset = Math.round(avgAge * 0.618); // smaller fraction of avgAge
  const resultYear = d3.getFullYear() + goldenOffset;

  resultDate.setFullYear(resultYear);
  
  return resultDate.toISOString().split("T")[0];
}
