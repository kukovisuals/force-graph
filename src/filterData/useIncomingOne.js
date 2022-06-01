import { useEffect, useState } from "react";
import * as d3 from "d3";

function useIncomingOne(incomingData, circulos) {
	const [school, setSchool] = useState([]);
	const [groups, setGroups] = useState(6);

	useEffect(() => {
		const cleanOne = (data) => {
			
			// group the teachers
			const teachersArr = getTheTeachesNames(data);
			setGroups(teachersArr.length);

			for (let i = 0; i < teachersArr.length; i++) {
				const teachersEntry = {
					category: i,
					id: teachersArr[i],
					size: circulos.parent,
					salary: 0,
				};
				setSchool((prevState) => [...prevState, teachersEntry]);
			}
			const mean = d3.mean(data, (d) => d.salary);
			const max = d3.max(data, (d) => d.salary);
			const scaleSalary = d3
				.scaleLinear()
				.domain([mean, max])
				.range([circulos.minimo, circulos.maximo]);

			// enter the studetns with the salary in school state
			for (const o of data) {
				let newEntrie = {}
				const catIndex = teachersArr.indexOf(o.teacher.split(' ')[0].toLowerCase())
				
				if (o.salary > mean && catIndex >= 0) {

					newEntrie = {
						category:catIndex,
						id: o.student,
						size: scaleSalary(o.salary),
						salary: o.salary,
					};
				} else if(catIndex >= 0){
					newEntrie = {
						category: catIndex,
						id: o.student,
						size: circulos.minimo,
						salary: o.salary,
					};
				}  
				if(o.student !== undefined){
					// console.log(o.student)
					setSchool((prevState) => [...prevState, newEntrie]);
				}
			}
		};

		cleanOne(incomingData);
	}, [incomingData, circulos]);

	return [school,groups];
}

// group the teachers here
const getTheTeachesNames = (data) => {
	const teacherGroup = d3.group(data, (d) => d.teacher);

	let newArrayNames = [];
	for (const [key, ] of teacherGroup) {
		if (key.length > 0) {
			const newKeyName = key.split(" ");
			newArrayNames.push(newKeyName[0].toLowerCase());
		}
	}

	return newArrayNames;
};

export default useIncomingOne;
