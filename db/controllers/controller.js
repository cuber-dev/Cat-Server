


async function updateOne(collection,query) {
    try {
      const result = await collection.updateOne(query.filter, { $set: query.update });
      console.log('updateOne')
      return { message: 'updateOne action successful' };
    } catch (error) {
      console.log(error);
    }
  }
  
  async function read(collection,{ query }) {
    try {
      const result = await collection.find(query || {}).toArray();
      console.log('read')
      return { result, message: 'read action successful' };
    } catch (error) {
      console.log(error);
    }
  }
  
module.exports = {
    updateOne,
    read
} 