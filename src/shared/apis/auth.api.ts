import {
	ChangePasswordDto,
	ResetPasswordDto,
	SignInDto,
	SignUpDto,
	UpdateProfileDto,
	User,
} from '@/schemas/auth/user.schema'
import { API_PATHS } from '@/shared/common/constants'
import {
	AuthTokens,
	BaseResponse,
	RefreshBody,
} from '@/shared/common/interfaces'
import http from '@/shared/configs/http.config'
import { AxiosRequestConfig } from 'axios'

const {
	AUTH: {
		BASE,
		SIGN_IN,
		REFRESH,
		INTROSPECT,
		SIGN_UP,
		SIGN_OUT,
		FORGOT_PASSWORD_REQUEST,
		FORGOT_PASSWORD_RESET,
		ME: { BASE: ME, UPDATE_PROFILE, CHANGE_PASSWORD },
	},
} = API_PATHS
class AuthApi {
	constructor(public path: string) {}

	private buildUrl(endpoint: string): string {
		return this.path + endpoint
	}

	signIn = async (dto: SignInDto): Promise<BaseResponse<AuthTokens>> =>
		http.post(this.buildUrl(SIGN_IN), dto)

	signUp = async (
		dto: Omit<SignUpDto, 'confirm_password'>,
	): Promise<BaseResponse<void>> => http.post(this.buildUrl(SIGN_UP), dto)

	signOut = async (configs?: AxiosRequestConfig): Promise<void> =>
		http.post(this.buildUrl(SIGN_OUT), undefined, configs)

	getProfile = async (): Promise<BaseResponse<User>> =>
		http.get(this.buildUrl(ME))

	updateProfile = async (dto: UpdateProfileDto): Promise<BaseResponse<void>> =>
		http.put(this.buildUrl(UPDATE_PROFILE), dto)

	changePassword = async (
		dto: ChangePasswordDto,
	): Promise<BaseResponse<void>> =>
		http.post(this.buildUrl(CHANGE_PASSWORD), dto)

	requestForgotPassword = async (email: string): Promise<BaseResponse<void>> =>
		http.post(this.buildUrl(FORGOT_PASSWORD_REQUEST), { email })

	resetForgotPassword = async (
		dto: ResetPasswordDto,
	): Promise<BaseResponse<void>> =>
		http.post(this.buildUrl(FORGOT_PASSWORD_RESET), dto)

	refresh = async (
		dto: RefreshBody,
	): Promise<BaseResponse<Pick<AuthTokens, 'access_token'>>> =>
		(await import('@/shared/configs/http.config')).default.post(
			this.buildUrl(REFRESH),
			dto,
		)

	introspect = async (token: string): Promise<BaseResponse<void>> =>
		http.post(this.buildUrl(INTROSPECT), { token })
}

export default new AuthApi(BASE)
