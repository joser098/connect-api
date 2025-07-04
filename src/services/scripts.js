const getDate = () => {
  return new Date().toISOString();
}

const getCommunity = (age) => {
  switch(age){
    case age < 25:
      return 1
    case age < 35:
      return 2
    case age >= 35:
      return 3    
    default:
      return 2;
  }
};

export {
  getDate,
  getCommunity
}