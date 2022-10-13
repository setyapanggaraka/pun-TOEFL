const formattedDate = (value) =>{
    return value.toLocaleString('id-ID',{dateStyle:"long"})
}

module.exports = formattedDate;