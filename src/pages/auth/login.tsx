import { Checkbox } from "@mui/material";
import { SignInPage } from "@toolpad/core";
import { useCustomActionMutation } from "../../redux/api";
import { EndpointList } from "../../redux/endpointList";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/mainSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const providers = [{ id: "credentials", name: "Email and Password" }];

function Login({}: Props) {
  const dispatch = useDispatch();
  const [loginMutation] = useCustomActionMutation();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <SignInPage
        signIn={async (provider, formData) => {
          const response: any = await loginMutation({
            url: EndpointList.LOGIN,
            body: {
              email: formData.get("email"),
              password: formData.get("password"),
            },
          });

          if (response?.error) {
            return {
              error: response?.error?.data?.message as string,
              success: "",
              type: "",
            };
          }

          dispatch(setUserData(response?.data));

          navigate("/task-manager");
          return {
            error: "",
            success: "Giriş Başarılı",
            type: "",
          };
        }}
        slotProps={{
          emailField: { variant: "standard", autoFocus: false },
          passwordField: { variant: "standard" },
          submitButton: { variant: "outlined" },

          rememberMe: {
            control: (
              <Checkbox
                value="true"
                color="primary"
                sx={{ padding: 0.5, "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            ),
            label: "Beni Hatırla",
          },
        }}
        providers={providers}
      />
    </div>
  );
}

export default Login;
