// Allow importing of HTML templates as strings
declare module "*.html" {
    const content: string;
    export default content;
}
