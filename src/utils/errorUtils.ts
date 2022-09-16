export function notFoundError(entity: string){
   
    return {
		type: "notFound",
		message: `Could not find specified ${entity}!`
	};
};

export function conflictError(entity: string){
    return {
		type: "conflict",
		message: `Already exists ${entity} with this title!`
	};
};

export function unauthorizedError(entity: string){
    return {
		type: "unauthorized",
		message: `Acess denied for this ${entity}!`
	};
};
