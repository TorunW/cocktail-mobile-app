export default openDatabase = async (pathToDatabaseFile) => {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite'))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite'
    );
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(pathToDatabaseFile)).uri,
    FileSystem.documentDirectory + 'SQLite/lemonSqueezy.db'
  );

  return SQLite.openDatabase('lemonSqueezy.db');
};
