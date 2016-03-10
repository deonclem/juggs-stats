/**
 * takes a team name as input and removes the accents / set to lowercase
 * @returns a string
 */

export function cleanTeamName() {
    return (input: string) => {
        if (input) {
            return input.toLowerCase().replace(/(é|è)/g,'e');
        }
    }
}