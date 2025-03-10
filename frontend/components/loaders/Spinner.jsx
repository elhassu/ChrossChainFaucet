import css from "./spinner.module.css";

export default function Spinner({ className = "" }) {
	return <div className={`${css.loader} ${className}`}></div>;
}
