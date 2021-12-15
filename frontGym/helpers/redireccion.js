const redireccion=() => {
    const navigate = useNavigate();
	const { info } = useSelector((state) => state.user);

	useEffect(() => {
		if (info !== null) {
			if (info.id_cargo === 3) {
				navigate("/user");
			} else if (info.id_cargo === 1) {
				navigate("/admin");
			}
		}
	}, [info]);
}