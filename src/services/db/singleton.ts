import PouchDB from './pouchdb';

export const localDb = new PouchDB('mydb.db', {
	adapter: 'react-native-sqlite',
}) as PouchDB.Database;

const dbConnectionUrl = '';

export const remoteDb = new PouchDB(dbConnectionUrl);
