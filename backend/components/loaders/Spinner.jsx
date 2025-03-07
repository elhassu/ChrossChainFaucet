import css from "./spinner.module.css";

export default function Spinner({ className = "" }) {
	return <span className={`${css.loader} ${className}`}></span>;
}
