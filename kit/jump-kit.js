import ASY from "@/base/asy";
import JumpMacro from "@/consts/macro/jump-macro";
export default class JumpKit{
	static jump(data,scene){
		let {jumpType,jumpContent} = data;
		switch (jumpType) {
			case JumpMacro.NAV_PAGE:
				ASY.navigateTo(jumpContent,)
				break;
			case JumpMacro.H5:
				break;
		}
	}
}
