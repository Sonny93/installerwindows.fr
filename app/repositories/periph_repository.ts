import Earphones from '#models/periphs/earphones';
import Headsets from '#models/periphs/headsets';
import Keyboards from '#models/periphs/keyboards';
import Microphones from '#models/periphs/microphones';
import Monitors from '#models/periphs/monitors';
import MousePads from '#models/periphs/mouse_pads';
import Mouses from '#models/periphs/mouses';
import {
	CountPerCategory,
	Earphone,
	Headset,
	Keyboard,
	Microphone,
	Monitor,
	Mouse,
	MousePad,
} from '#shared/types/index';
import { ModelObject } from '@adonisjs/lucid/types/model';

export class PeriphRepository {
	static async getCountPerCategory(): Promise<CountPerCategory> {
		const headsetCount = await this.getCount(Headsets);
		const keyboardCount = await this.getCount(Keyboards);
		const earphoneCount = await this.getCount(Earphones);
		const monitorCount = await this.getCount(Monitors);
		const mouseCount = await this.getCount(Mouses);
		const mousepadCount = await this.getCount(MousePads);
		const microphoneCount = await this.getCount(Microphones);

		return {
			headset: headsetCount,
			keyboard: keyboardCount,
			earphone: earphoneCount,
			monitor: monitorCount,
			mouse: mouseCount,
			mousepad: mousepadCount,
			microphone: microphoneCount,
		};
	}

	static async getCount(
		model:
			| typeof Headsets
			| typeof Keyboards
			| typeof Earphones
			| typeof Monitors
			| typeof Mouses
			| typeof MousePads
			| typeof Microphones
	): Promise<number> {
		const count = await model.query().count('id as count');
		return count[0].$extras.count ?? 0;
	}

	static async getHeadset(): Promise<Headset[]> {
		const headsets = await Headsets.query();
		return this.arraySerialize<Headsets, Headset>(headsets);
	}

	static async getKeyboard(): Promise<Keyboard[]> {
		const keyboards = await Keyboards.query();
		return this.arraySerialize<Keyboards, Keyboard>(keyboards);
	}

	static async getEarphone(): Promise<Earphone[]> {
		const earphones = await Earphones.query();
		return this.arraySerialize<Earphones, Earphone>(earphones);
	}

	static async getMicrophone(): Promise<Microphone[]> {
		const microphones = await Microphones.query();
		return this.arraySerialize<Microphones, Microphone>(microphones);
	}

	static async getMonitor(): Promise<Monitor[]> {
		const monitors = await Monitors.query();
		return this.arraySerialize<Monitors, Monitor>(monitors);
	}

	static async getMousePad(): Promise<MousePad[]> {
		const mousepads = await MousePads.query();
		return this.arraySerialize<MousePads, MousePad>(mousepads);
	}

	static async getMouse(): Promise<Mouse[]> {
		const mouses = await Mouses.query();
		return this.arraySerialize<Mouses, Mouse>(mouses);
	}

	private static arraySerialize<T extends ModelObject, Y>(array: T[]): Y[] {
		return array.map((item) => item.serialize() as Y);
	}
}
