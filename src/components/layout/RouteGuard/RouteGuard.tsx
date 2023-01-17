import { useAppDispatch } from "../../../app/hooks";
import { setAccessToken, setUser } from "../../../features/auth/authSlice";
import {
	useGetMeQuery,
	useRefreshQuery,
} from "../../../lib/__generated__/graphql";

type RouteGuardProps = {
	children: React.ReactNode;
	requireAuth?: boolean;
};

export const RouteGuard: React.FC<RouteGuardProps> = ({
	children,
	requireAuth = true,
}) => {
	const dispatch = useAppDispatch();

	const query = useRefreshQuery(
		{},
		{
			enabled: false,
			retry: 1,
			onError: () => {
				document.location.href = "/auth/login";
			},
			onSuccess: (data) => {
				if (data.refresh) {
					console.log("sup");

					dispatch(setAccessToken(data.refresh));
				}
			},
		}
	);

	const { isLoading, isFetching, data } = useGetMeQuery(
		{},
		{
			retry: 1,
			enabled: !!requireAuth,
			onError: () => {
				query.refetch({ throwOnError: true });
			},
			onSuccess: (data) => {
				if (data.getMe) {
					dispatch(setUser(data.getMe));
				}
			},
		}
	);

	if (!requireAuth) {
		return <>{children}</>;
	}

	const loading = isFetching || query.isFetching;

	return <>{requireAuth && data?.getMe ? <>{children}</> : <></>}</>;
};
