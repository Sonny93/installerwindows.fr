import { ModelObject } from '@adonisjs/lucid/types/model';

export class SerializerService {
	static serialize<T extends ModelObject, Y>(item: T): Y {
		return item.serialize() as Y;
	}

	static arraySerialize<T extends ModelObject, Y>(array: T[]): Y[] {
		return array.map((item) => item.serialize() as Y);
	}
}
