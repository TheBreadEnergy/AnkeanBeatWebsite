
export const funcRandom = (length) => {
    let number = 1 + Math.random() * (length)
     if(Math.round(number-2)!==length&&Math.round(number-2)>=0){
          return Math.round(number-2);
     }else{
          return(0)
     }
};

export const refactorTime = (sec) => {
    const min = Math.floor(sec / 60)
    const returnMin = `${min}`;
    const secs = Math.floor(sec % 60)
    const returnSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${returnMin}:${returnSecs}`
}
