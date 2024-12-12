import {
	ChangePasswordDto,
	ResetPasswordDto,
	SignInDto,
	SignUpDto,
	UpdateProfileDto,
	User,
} from '@/schemas/auth/user.schema'
import { API_PATHS } from '@/shared/common/constants'
import { AuthTokens, BaseResponse } from '@/shared/common/interfaces'
import { AxiosRequestConfig } from 'axios'

const {
	AUTH: {
		BASE,
		SIGN_IN,
		SIGN_UP,
		SIGN_OUT,
		FORGOT_PASSWORD_REQUEST,
		FORGOT_PASSWORD_RESET,
		ME: { BASE: ME, UPDATE_PROFILE, CHANGE_PASSWORD },
	},
} = API_PATHS

const httpConfig = await import('@/shared/configs/http.config')
class AuthApi {
	constructor(public path: string) {}

	private buildUrl(endpoint: string): string {
		return this.path + endpoint
	}

	signIn = async (dto: SignInDto): Promise<BaseResponse<AuthTokens>> =>
		httpConfig.default.post(this.buildUrl(SIGN_IN), dto)

	signUp = async (
		dto: Omit<SignUpDto, 'confirm_password'>,
	): Promise<BaseResponse<void>> =>
		(await import('@/shared/configs/http.config')).default.post(
			this.buildUrl(SIGN_UP),
			dto,
		)

	signOut = async (configs?: AxiosRequestConfig): Promise<void> =>
		httpConfig.default.post(this.buildUrl(SIGN_OUT), undefined, configs)

	getProfile = async (): Promise<BaseResponse<User>> =>
		httpConfig.default.get(this.buildUrl(ME))

	updateProfile = async (dto: UpdateProfileDto): Promise<BaseResponse<void>> =>
		httpConfig.default.put(this.buildUrl(UPDATE_PROFILE), dto)

	changePassword = async (
		dto: ChangePasswordDto,
	): Promise<BaseResponse<void>> =>
		httpConfig.default.post(this.buildUrl(CHANGE_PASSWORD), dto)

	requestForgotPassword = async (email: string): Promise<BaseResponse<void>> =>
		httpConfig.default.post(this.buildUrl(FORGOT_PASSWORD_REQUEST), { email })

	resetForgotPassword = async (
		dto: ResetPasswordDto,
	): Promise<BaseResponse<void>> =>
		httpConfig.default.post(this.buildUrl(FORGOT_PASSWORD_RESET), dto)
}

export default new AuthApi(BASE)
