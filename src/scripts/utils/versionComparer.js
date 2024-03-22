const compareVersions = (v1, v2) => {
  const v1Arr = v1.split('.');
  const v2Arr = v2.split('.');
  
  const maxLength = Math.max(v1Arr.length, v2Arr.length);
  
  for (let i = 0; i < maxLength; i++) {
    const num1 = i < v1Arr.length ? v1Arr[i] : 0;
    const num2 = i < v2Arr.length ? v2Arr[i] : 0;

    if(num1 > num2) {
      return -1;
    } else if (num1 < num2) {
      return 1;
    }
  }
  return 0
}

export default compareVersions;