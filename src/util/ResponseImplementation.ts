export class ResponseImplementation {
	public data: any;
	public has_error: boolean;
	public error: any;

	constructor(data: any, has_error: boolean, error?: any) {
		Object.assign(this, { data, has_error, error });
	}
}
