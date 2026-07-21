import { Header } from '../../components/header';
import './404Page.css';

export function ErrorPage(){
    return(
        <>
            <Header />
            <p>❌Error! Invalid URL</p>
        </>
    );
}