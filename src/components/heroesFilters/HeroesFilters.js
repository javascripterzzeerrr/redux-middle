import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilters, filterActive } from '../../actions/index';

import { useHttp } from '../../hooks/http.hook';

import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    const switchClass = (filter) => {
        switch (filter) {
            case "all":
                return {classBtn: "btn-outline-dark", desc: "Все"}
            case "fire":
                return {classBtn: "btn-danger", desc: "Огонь"};
            case "water":
                return {classBtn: "btn-primary", desc: "Вода"};
            case "wind":
                return {classBtn: "btn-success", desc: "Ветер"};
            case "earth":
                return {classBtn: "btn-secondary", desc: "Земля"};
            default:
                return {classBtn: "", desc: ""}
        } 
    }

    const renderBtn = (arrayFilters) => {
        return arrayFilters.map(item => {
            let { classBtn, desc } = switchClass(item);
            if (activeFilter === item) {
                classBtn += " active";
            }

            return <button 
                key={item}
                value={item}
                name={item}
                className={"btn " + classBtn}
                onClick={() => dispatch(filterActive(item))}
                >{desc}</button>
        })
    }

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />
    } else if (filtersLoadingStatus === 'error') {
        // return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const content = renderBtn(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;