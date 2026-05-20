(async ()=>{
  try{
    const clientPromise = await import('../lib/mongodb');
    const client = await clientPromise.default;
    const db = client.db();
    const u = await db.collection('users').findOne({ email: 'tester@example.com' });
    console.log(u ? { found: true, id: u._id } : { found: false });
    process.exit(0);
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();
