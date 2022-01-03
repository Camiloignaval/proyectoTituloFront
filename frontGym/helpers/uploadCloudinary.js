import { useDispatch } from "react-redux";
import { startUploadImg } from "../src/actions/auth";

export const uploadCloudinary = async () => {
	return await cloudinary.openUploadWidget(
		{
			cloudName: "dc6vako2z",
			uploadPreset: "vdrhajj8",
			sources: ["local", "url", "camera", "image_search", "google_drive"],
			googleApiKey: "<image_search_google_api_key>",
			showAdvancedOptions: false,
			cropping: false,
			multiple: false,
			defaultSource: "local",
			singleUploadAutoClose: false,
			styles: {
				palette: {
					window: "#000000",
					sourceBg: "#000000",
					windowBorder: "white",
					tabIcon: "#ffc312",
					inactiveTabIcon: "#b88d0c",
					menuIcons: "#ffc312",
					link: "#ffc312",
					action: "#ffc312",
					inProgress: "#00BFFF",
					complete: "#33ff00",
					error: "#EA2727",
					textDark: "#000000",
					textLight: "#FFFFFF",
				},
				fonts: {
					default: null,
					"'Space Mono', monospace": {
						url: "https://fonts.googleapis.com/css?family=Space+Mono",
						active: true,
					},
				},
			},
		},
		(err, result) => {
			if (!err && result.event == "success") {
				// Swal.fire("Excelente", "Tu imagen ha sido actualizada", "success");
				const {
					info: { url },
				} = result;
				console.log("Paso 2, url a retornar desde funcion:", url);
				return url;
			} else if (err) {
				// Swal.fire(
				// 	"oh oh",
				// 	"Hemos tenido un problema, intenta mas tarde",
				// 	"error",
				// );
				return { ok: false };
			}
		},
	);
};
