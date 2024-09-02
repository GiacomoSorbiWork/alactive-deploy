import React, { useEffect, useState } from "react";
import { IonContent, IonFooter, IonPage } from "@ionic/react";
import { LargeDefaultButton } from "../../subComponents/Buttons";
import logo from "../../../resources/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [isClicked, setIsClicked] = useState(false);

  // useEffect(() => {
  //   fetchGraphQLData();
  // }, []);

  // const fetchGraphQLData = async () => {
  //   const query = `
  // 		 query me {
  // 			me {
  // 				handle
  // 				name
  // 				avatar
  // 				birthday
  // 			}
  // 		}
  // 	`;

  //   try {
  //     // const token = await getAccessTokenSilently();
  //     // console.log(token);
  //     const token =
  //       "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRqRE9aVmpoSGY0LWI2dGduYlFBcyJ9.eyJpc3MiOiJodHRwczovL2FsYWN0aXZlLWRldi51ay5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjZkMGM0ZDQ0ZDMzZjgxNzkwNGEwYTk3IiwiYXVkIjpbImh0dHA6Ly92MS5hcGkuYWxhY3RpdmUuYXBwL2dyYXBocWwiLCJodHRwczovL2FsYWN0aXZlLWRldi51ay5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzI1MjEwMTAzLCJleHAiOjE3MjUyOTY1MDMsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiIxOWlVWWJoRk56NER2NUFXaFd6NUJYZmFtWFRqQnBxWiJ9.WUBbLifPDiV5xHhHQedJ9k38Zik5w8KM7XQOIKXV1bLd7c4ibxAfVor2grtZVdu-smz0xI9koLnkwY4KBhIIjuyfiGBMbKmDnchMSCIaIgyxlc2_q9V15HBWPPG4B_bbybGUDsZc6PjgaLfIYhITIPKZaBOjAB84hc9PkpFmTeeRyp-oxntsX-O-jHcTh_BNLhLD2VUHsaqSm6pLce1lpsKzRy7VnxLVLPqx-0PN3g-Q_ELloZnLSaoGHykubZg2ERoQnOtj1vpQsIJXAPcdn7liRLBTRrZBhM3X-7BGQFLSXauL6Sx1qQdCAPM5w48iDSitEMPPsignWoR7X1l04w";

  //     const response = await fetch("http://v1.api.alactive.app/graphql", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Type Bearer, Token " + token,
  //         Origin: "http://localhost:5173",
  //       },
  //       body: JSON.stringify({ query }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  setTimeout(() => {
    setIsClicked(true);
  }, 1000);
  return (
    <IonPage>
      <IonContent>
        <div className="h-full">
          {!isClicked ? (
            <div className="bg-activeButton h-screen flex justify-center items-center cursor-pointer">
              <img src={logo} alt="logo" className="h-[180px]" />
            </div>
          ) : (
            <div className="bg-primaryContainer h-full flex flex-col">
              <div className="flex flex-col items-center justify-center h-full bg-black p-4">
                <img src={logo} alt="logo" className="h-[180px]" />
              </div>
            </div>
          )}
        </div>
      </IonContent>
      <IonFooter className="p-4 mb-4">
        <LargeDefaultButton
          text="Continue"
          className="w-full"
          onClick={() => loginWithRedirect()}
          state={"isActive"}
        />
      </IonFooter>
    </IonPage>
  );
};

export default Login;
