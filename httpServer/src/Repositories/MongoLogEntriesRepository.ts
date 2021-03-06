// eslint-disable-next-line no-unused-vars
import { ILogEntriesRepository } from './ILogEntriesRepository';
// eslint-disable-next-line no-unused-vars
import { LogEntryValue } from '../Models/LogEntryValue';
// eslint-disable-next-line no-unused-vars
import { MongoClient, Db } from 'mongodb';

export class MongoLogEntriesRepository implements ILogEntriesRepository {
    constructor(private mongoClient: MongoClient) { }

    async ReadEntries(start: number, size: number, severity: string): Promise<LogEntryValue[]> {
        try {
            const db: Db = this.mongoClient.db('beademing');

            return db.collection('logs')
                .find({})
                .sort({ loggedAt: -1 })
                .skip(start)
                .limit(size)
                .toArray();
        } catch (exception) {
            // todo: log exception
            console.error(exception);
        }
    }

    async WriteEntry(entry: LogEntryValue): Promise<void> {
        try {
            const db: Db = this.mongoClient.db('beademing');

            await db.collection('logs').insertOne(entry);
        } catch (exception) {
            // todo: log exception
            console.error(exception);
        }
    }
}
