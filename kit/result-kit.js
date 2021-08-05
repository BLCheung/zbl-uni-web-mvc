import Macro from '../consts/macro';

export default class ResultKit {
	constructor(code = Macro.Fail, msg = '', data = null) {
		this.code = code;
		this.ok = code === Macro.OK;
		this.msg = msg;
		this.data = data;
	}

	/**
	 * 封装结果
	 * @param {*} res 返回结果res
	 */
	static setResult(res) {
		// console.log('origin:', res);
		const {
			code,
			msg,
			data
		} = res.data;
		return new ResultKit(code, msg, data);
	}

	/**
	 * 强制转换为成功的请求
	 * @param {*} data 成功需要返回的数据源
	 * @param {*} msg 成功的消息提醒
	 */
	static OK(data, msg = '') {
		return new ResultKit(Macro.OK, msg, data);
	}

	/**
	 * 强制转换为失败的请求
	 * @param {*} msg 失败的消息提醒
	 * @param {*} data 失败需要返回的数据源
	 */
	static Failed(msg = '', data = null) {
		return new ResultKit(Macro.Fail, msg, data);
	}

	/**
	 * 请求是否成功
	 */
	isOK() {
		return this.ok;
	}
}
