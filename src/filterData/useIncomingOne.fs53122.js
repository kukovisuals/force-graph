import {useEffect, useState} from 'react';
import * as d3 from 'd3'
import gotJobs from './gotJobs.json';

const initialState = [
  { category: 0, id: "Natalie", size: 50, salary: 0 },
  { category: 1, id: "Luis", size: 50, salary: 0 },
  { category: 2, id: "Yujin", size: 50, salary: 0 },
  { category: 3, id: "Cara", size: 50, salary: 0 },
  { category: 4, id: "Brandon", size: 50, salary: 0 },
  { category: 5, id: "Sam", size: 50, salary: 0 },
]

function useIncomingOne(){
	const [school, setSchool] = useState(initialState)

	useEffect(() => {
		d3.csv('http://localhost:3000/data/student.csv', (data) =>{
			cleanOne(data)
		}).catch(err => console.error(err))
		return () => {}
	},[])

	function cleanOne(data){

		let category = 0
		let teacher = data.teacher.split(' ')[0].trim().toLowerCase()
		let salary = 0

		// console.log(teacher, data)
		switch(teacher){
			case 'natalie': category = 0
				break;
			case 'luis': category = 1
				break;
			case 'yujin': category = 2
				break;
			case 'cara': category = 3
				break;
			case 'brandon': category = 4
				break;
			case 'sam': category = 5
				break;
			default: console.error('There is a missing teacher')
				break;
		}
		const winners = gotJobs.find( d => d.name === data.student)

		let newEntrie = {}
		const scaleSalary = d3.scaleLinear().domain([70000,170000]).range([3, 15])
		
		if(typeof winners === 'object') {
			newEntrie = { category, id: data.student, size: scaleSalary(winners.salary), salary: winners.salary}
		} else {
			newEntrie = { category, id: data.student, size: 3, salary: 0}
		}
		 
		setSchool(prevState => [...prevState, newEntrie])
		
	}
	// console.log(school)
	return school
}

export default useIncomingOne;