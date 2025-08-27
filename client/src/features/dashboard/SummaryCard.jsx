import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

const SummaryCard = ({ content, value }) => {
    const { title, description } = content;
    const Icon = content?.icon;

    return (
        <Card className="@container/card">
            <CardHeader className="grid grid-cols-[2.5fr_1fr] items-center justify-between">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-accent-700 row-start-2 text-2xl font-semibold @[250px]/card:text-3xl">
                    {value}
                </CardTitle>
                <Icon className="text-accent-500 row-span-2 justify-self-end size-12"/>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">
                    {description}
                </div>
            </CardFooter>
        </Card>
    );
};

export default SummaryCard;