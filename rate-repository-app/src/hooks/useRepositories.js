import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";
import { useEffect, useState } from "react";

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const { data, loading, refetch } = useQuery(ALL_REPOSITORIES, {
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (data) setRepositories(data.repositories);
    }, [data]);

    return { repositories, loading, refetch };
};

export default useRepositories;