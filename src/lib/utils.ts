export function badgeColor(alignment: boolean | string) {
	if (alignment === true) {
		return 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300';
	} else if (alignment === 'partial') {
		return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300';
	} else {
		return 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300';
	}
}
