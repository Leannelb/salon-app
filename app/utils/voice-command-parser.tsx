export type CommandResult = {
    intent?: string;
    service?: string;
    stylist?: string;
    date?: Date;
    time?: string;
    branch?: string;
};

export function parseVoiceCommand(text: string): CommandResult {
    const command = text.toLowerCase();
    const result: CommandResult = {};
    
    // Detect booking intent
    if (command.includes('book') || command.includes('appointment')) {
        result.intent = 'booking';
    }

    // Detect service
    if (command.includes('haircut')) result.service = '1';
    if (command.includes('color')) result.service = '2';
    if (command.includes('styling')) result.service = '3';

    // Detect stylist
    if (command.includes('john')) result.stylist = '1';
    if (command.includes('sarah')) result.stylist = '2';
    if (command.includes('michael')) result.stylist = '3';

    // Detect branch
    if (command.includes('southside')) result.branch = 'southside';
    if (command.includes('northside')) result.branch = 'northside';
    if (command.includes('westside')) result.branch = 'westside';
    if (command.includes('east end')) result.branch = 'eastend';

    // Basic date detection
    if (command.includes('today')) {
        result.date = new Date();
    } else if (command.includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        result.date = tomorrow;
    }

    // Basic time detection
    const timeRegex = /(\d{1,2})(:\d{2})?\s*(am|pm)/i;
    const timeMatch = command.match(timeRegex);
    if (timeMatch) {
        const hour = parseInt(timeMatch[1]);
        const isPM = timeMatch[3].toLowerCase() === 'pm';
        result.time = `${isPM && hour < 12 ? hour + 12 : hour}:00`;
    }

    return result;
}

export default parseVoiceCommand;