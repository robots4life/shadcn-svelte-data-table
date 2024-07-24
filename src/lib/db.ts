import { eachDayOfInterval, format } from 'date-fns';

export const menuData = eachDayOfInterval({
	start: new Date(2024, 6, 1),
	end: new Date(2024, 6, 31)
}).map((element, index) => {
	const randomBreakfast = Math.random();
	return {
		id: String(index + 1),
		date: format(element, 'yyyy-MM-dd'),
		meals: [
			{
				breakfast:
					randomBreakfast > 0.5 ? (Math.random() > 0.5 ? 'Omelette' : 'Avocado Toast') : '',
				...(randomBreakfast > 0.5 && {
					breakfastPrice: Math.floor(Math.random() * 10) + 5
				})
			}
		]
	};
});
