import { SvgIconComponent } from "@mui/icons-material";

export interface ButtonProps {
	text: string;
	isActive?: boolean;
	svg?: SvgIconComponent;
	onClick: () => void;
}
