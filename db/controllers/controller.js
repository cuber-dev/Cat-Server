


async function updateOne(collection,{ query , action}) {
    try {
      const result = await collection.updateOne(query.filter, query.update);
      console.log(action)
      return { message: 'updateOne action successful' };
    } catch (error) {
      console.log(error);
    }
  }
  
  async function read(collection,{ query , action }) {
    try {
      const result = await collection.find(query || {}).toArray();
      console.log(action)
      return { result, message: 'read action successful' };
    } catch (error) {
      console.log(error);
    }
  }
  
module.exports = {
    updateOne,
    read
} 