const estimatedTime = (value) => {
    if(value > 60){
        let jam = Math.floor(value/60);
        let sisa = value%60;
        return `${jam} Hour ${sisa} Minutes`
    }else{
        return `${value} Minutes`
    }
}

module.exports = estimatedTime;