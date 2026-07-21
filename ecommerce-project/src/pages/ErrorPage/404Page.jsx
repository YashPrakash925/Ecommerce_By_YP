import { Header } from '../../components/header';
import './404Page.css';

export function ErrorPage({cart}){
    return(
        <>
            <Header cart={cart}/>
            <p>❌Error! Invalid URL</p>
        </>
    );
}