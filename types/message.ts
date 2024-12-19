// types/message.ts

export interface IMessage {
	// savedMessage: any;
	_id?: string; // _id è opzionale
	title: string;
	text: string;
}

export class Message implements IMessage {
	_id?: string; // Anche nella classe è opzionale
	title: string;
	text: string;
	savedMessage: any;

	constructor(title: string, text: string, _id?: string) {
		this.title = title;
		this.text = text;
		if (_id) this._id = _id; // L'ID viene assegnato solo se passato
	}
}
