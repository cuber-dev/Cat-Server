
const getPercentage = (from,total) => {
    return `${((from / total) * 100).toFixed(2)}%`
}

const filter = (data) => {
    const total = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(data[0].totalCatVotes)
    const votes = [  
        { cat1 : getPercentage(data[1].votes,data[0].totalCatVotes) }, 
        { cat2 : getPercentage(data[2].votes,data[0].totalCatVotes) },
        { cat3 : getPercentage(data[3].votes,data[0].totalCatVotes) },
        { cat4 : getPercentage(data[4].votes,data[0].totalCatVotes) },
    ]
    return { total , votes } 
}

const getJsonResponse = (response) => {
    const { total , votes } = filter(response.result)
    const json = {   
            accepted : true,
            total,
            votes, 
            message : response.message
        }
    console.log(json)
    return json     
}
 

module.exports = {
    getJsonResponse
}